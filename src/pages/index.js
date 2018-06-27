import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";

class IndexPage extends Component {
  state = {
    events: {},
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const { results } = await api.getPopularEvents();

    const events = results.reduce((groups, event) => {
      const { parent_name } = event;
      groups[parent_name] = groups[parent_name] || [];
      groups[parent_name].push(event);
      return groups;
    }, {});

    this.setState({ events });
  }

  render() {
    const { events } = this.state;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Popular Events</h1>
        </header>

        {Object.keys(events).map((group) =>
          <div key={group}>
            <h2>{group}</h2>

            {events[group].map((event) =>
              <div key={event.id}>
                <Link
                  className="event-link"
                  to={`/events/${event.id}`}
                >
                  {event.name}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default IndexPage;
