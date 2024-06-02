import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNote = () => {
        api.get("api/notes/").then((res) => res.data).then((data) => setNotes(data)).catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Usunełeś wpis!")
            else alert("Nie udało się usunąć")
            getNote();
        }).catch((error) => alert(error))
        
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Dodałeś wpis!")
            else alert("Nie udało się dodać wpisu!")
            getNotes();
        }).catch((err) => alert(err))
        
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id}></Note>
            ))}
        </div>
        <h2>Nowy wpis</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title}></input>
            <label htmlFor="content">Content:</label>
            <br/>
            <textarea id="content" name="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <br/>
            <input type="submit" value="Submit"></input>
        </form>
    </div>
}

export default Home;