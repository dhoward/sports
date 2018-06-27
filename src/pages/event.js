import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../api";

class EventPage extends Component {
  state = {
    event: {},
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  }

  async componentDidMount() {
    this.getEvent();
  }

  getEvent = async () => {
    const { match: { params } } = this.props;
    const { event } = await api.getEvent(params.id);
    this.setState({ event });
  }

  parseDate = (datetime) => {
    const d = new Date(datetime);
    const day = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0")
    const time = `${hours}:${minutes}`;
    return `${day} ${time}`;
  }

  render() {
    const { event } = this.state;

    return (
      <div className="app">
        <header className="header">
          {event.name ?
            <React.Fragment>
              <h1 className="title">{event.name}</h1>
              <h2 className="subtitle">Category: {event.parent_name}</h2>
              <h2 className="subtitle">Start: {this.parseDate(event.start_datetime)}</h2>
            </React.Fragment>
            :
            <h1 className="App-title">Loading...</h1>
          }
        </header>

        {event.event_type &&
          <Link
            className="event-link"
            to={`/sports/${event.event_type}`}
          >
            VIEW MORE {event.event_type.toUpperCase()}
          </Link>
        }
      </div>
    );
  }
}

export default EventPage;
