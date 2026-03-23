import React, { useEffect, useState, type MouseEventHandler } from "react";
import Card from "react-bootstrap/Card";
import { type Poem } from "../../Types/poem";
import { useNavigate } from "react-router";
import bookmark from "./bookmark.png";
import bookmarkFill from "./bookmarkfilled.png";
import "./PoemDetailsCard.css";

const  updateBookmark = (apiUrl: string, id: string, isBookmarked: number, setIsBookmarked: React.Dispatch<React.SetStateAction<number>>) => {
    fetch(apiUrl + "/bookmark/" + id, {
                method: "PUT",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    isBookmarked: isBookmarked
                })
            })
            .then((res) => {
                if (res.ok) setIsBookmarked(isBookmarked);
            })
            .catch((error) => {
                window.alert("Couldn't connect to server. Check your network connection and try again.");
                console.error(error);
                throw error;
            })
}

const PoemDetailsCard: React.FC<Poem> = (poem: Poem) => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [isBookmarked, setIsBookmarked] = useState<number>(poem.isBookmarked);
    const bookmarkRef = React.useRef<HTMLImageElement>(null);

    const onPoemClick: MouseEventHandler = () => {
        navigate("/poem/" + poem.id);
    }

    const onBookmarkClick: MouseEventHandler = (e) => {
        if(isBookmarked === 1){
            updateBookmark(apiUrl, poem.id, 0, setIsBookmarked);
        }
        else if (isBookmarked === 0){
            updateBookmark(apiUrl, poem.id, 1, setIsBookmarked);
        }
        e.stopPropagation()
    }

    useEffect(() => {
        if (bookmarkRef.current){
            if (isBookmarked === 1){
                bookmarkRef.current.src = bookmarkFill;
            }
            else if (isBookmarked === 0){
                bookmarkRef.current.src = bookmark;
            }
        }
    }, [isBookmarked])

    return(
        <>
            <Card className="poem-details-card" onClick={onPoemClick}>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-between">
                        <Card.Title className="poem-title mb-2">{poem.title}</Card.Title>
                        <img className="card-bookmark-icon" ref={bookmarkRef} onClick={onBookmarkClick}></img>
                    </div>
                    <Card.Subtitle className="poem-author mb-3">{"By " + poem.poet}</Card.Subtitle>
                    <Card.Text>{poem.poem.substring(0, 50) + "..."}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PoemDetailsCard;