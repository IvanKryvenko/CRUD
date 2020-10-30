import React, { Component } from "react";
import PositionDataService from "../services/position.service";

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.getPosition = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePosition = this.updateTutorial.bind(this);
    this.deletePosition = this.deleteTutorial.bind(this);

    this.state = {
      currentPosition: {
        id: null,
        title: '',
        imageSrc: '',
        description: '',
        published: false
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getPosition(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPosition: {
          ...prevState.currentPosition,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPosition: {
        ...prevState.currentPosition,
        description: description
      }
    }));
  }

  onChangeImage(e) {
      const imageSrc = e.target.value;
      
      this.setState(prevState => ({
          currentPosition: {
            ...prevState.currentPosition,
            imageSrc: imageSrc
          }
      }));
  }

  getTutorial(id) {
    PositionDataService.get(id)
      .then(res => {
        this.setState({
          currentPosition: res.data
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPosition.id,
      title: this.state.currentPosition.title,
      imageSrc: this.state.currentPosition.imageSrc,
      description: this.state.currentPosition.description,
      published: status
    };

    PositionDataService.update(this.state.currentPosition.id, data)
      .then(res => {
        this.setState(prevState => ({
          currentPosition: {
            ...prevState.currentPosition,
            published: status
          }
        }));
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePosition() {
    PositionDataService.update(
      this.state.currentPosition.id,
      this.state.currentPosition
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: "The Position was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePosition() {    
    PositionDataService.delete(this.state.currentPosition.id)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/positions')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPosition } = this.state;

    return (
      <div>
        {currentPosition ? (
          <div className="edit-form">
            <h4>Position</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPosition.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  value={currentPosition.imageSrc}
                  onChange={this.onChangeImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPosition.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPosition.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPosition.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePosition}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePosition}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Position...</p>
          </div>
        )}
      </div>
    );
  }
}