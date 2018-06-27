import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";

class SportPage extends Component {
  state = {
    name: "",
    events: [],
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  }

  componentDidMount() {
    this.getSport();
  }

  getSport = async () => {
    const { match: { params } } = this.props;
    const { events, event_ids, name } = await api.getSport(params.id);
    const eventList = event_ids.map(id => events[id]);

    this.setState({
      name,
      events: eventList
    });
  }

  render() {
    const { name, events } = this.state;
    const title = name ? `Popular Events in ${name}` : "Loading...";

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">{title}</h1>
        </header>

        {events.map((event) =>
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
    );
  }
}

export default SportPage;
