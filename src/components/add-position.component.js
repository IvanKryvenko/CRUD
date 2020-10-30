import React, { useState } from 'react';
import PositionDataService from '../services/position.service';

export default function AddPosition() {
    let [id, setId] = useState(null);
    let [imageSrc, setImage] = useState('');
    let [title, onChangeTitle] = useState('');
    let [description, onChangeDescription] = useState('');
    let [published, onPublish] = useState(false);
    let [submitted, onSubmit] = useState(false);

    function savePosition() {
        let data = {
            title: title,
            imageSrc: imageSrc,
            description: description
        };

        PositionDataService.create(data)
        .then(res => {{
            id = setId(res.data.id);
            imageSrc = setImage(res.data.imageSrc);
            title = onChangeTitle(res.data.title);
            description = onChangeDescription(res.data.description);
            published = onPublish(res.data.published);

            submitted = onSubmit(true);
            } 
            console.log(res.data);   
        })
        .catch(e => {
            console.log(e);
        });
    }

    function newPosition() {
        id = setId(null);
        imageSrc = setImage('');
        title = onChangeTitle('');
        description = onChangeDescription('');
        published = onPublish(false);
        submitted = onSubmit(false)
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Position submitted successfully!</h4>
                    <button btn btn-success onClick={newPosition}>
                        Add Hot Dog
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={e => onChangeTitle(e.target.value)}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Image</label>
                        <input 
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            required
                            value={imageSrc}
                            onChange={e => setImage(e.target.value)}
                            name="image"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={e => onChangeDescription(e.target.value)}
                            name="description"
                        />
                    </div>
                    <button onClick={() => {savePosition()}} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}    
        </div>
    );
}