import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';
import "../styles/ProfileForm.css"

function ProfileForm() {
    const [profile, setProfile] = useState({
        age: '',
        weight: '',
        height: '',
        activity: ''
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        api.get('/api/profile/')
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => alert(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put('/api/profile/', profile)
            .then((res) => {
                alert('Profile updated successfully');
                setProfile(res.data);
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <h2>Edit Profile</h2>
            <label>
                Age:
                <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                />
            </label>
            <label>
                Weight (kg):
                <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                />
            </label>
            <label>
                Height (cm):
                <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                />
            </label>
            <label>
                Activity:
                <select name="activity" value={profile.activity} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

export default ProfileForm;
