import React, { useEffect, useState, type MouseEventHandler } from "react";
import Card from "react-bootstrap/Card";
import { type Poem } from "../../Util/poem";
import "./PoemDetailsCard.css"
import { useNavigate } from "react-router";
import bookmark from "./bookmark.png";
import bookmarkFill from "./bookmarkfilled.png";

interface BookmarkStatus {
    isBookmarked: number;
}

const getIsBookmarkedCall = (apiUrl: string, id: string,  bookmarkRef: React.RefObject<HTMLImageElement | null>) : Promise<0 | 1 |undefined>  => {
    return fetch(apiUrl + "/bookmark/:" + id, {
                method: "GET",
                mode: 'cors'
            })
        .then(res => {
            if (!res.ok) throw new Error(`error status: ${res.status}`);
            return res.json()     
        })
        .then((data: BookmarkStatus) => {    
                if (bookmarkRef.current){
                    if (data && data.isBookmarked === 1){
                        return data.isBookmarked;
                    }
                    else if (data && data.isBookmarked === 0){
                        return data.isBookmarked;
                    }
                    else {
                        console.error("Error receiving bookmark status. Invalid response.")
                    }
                }
        })
}

const  setIsBookmarkedCall = (apiUrl: string, id: string, isBookmarked: number) => {
    fetch(apiUrl + "/bookmark/:" + id, {
                method: "PUT",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    isBookmarked: isBookmarked
                })
            }
        )
}

const PoemDetailsCard: React.FC<Poem> = (poem: Poem) => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<number>();
    const bookmarkRef = React.useRef<HTMLImageElement>(null);
    
    const isBookmarkedInitialState = getIsBookmarkedCall(apiUrl, poem.id, bookmarkRef);
    if(!isInitialized){
        isBookmarkedInitialState.then((data) => {
            if (data != undefined){
                setIsBookmarked(data);
                setIsInitialized(true);
            }
        })
    }

    const onPoemClick: MouseEventHandler = () => {
        navigate("/poem", {state: {Poem: poem}})
    }

    const onBookmarkClick: MouseEventHandler = (e) => {
        if(isBookmarked === 1){
            setIsBookmarkedCall(apiUrl, poem.id, 0);
            setIsBookmarked(0);
        }
        else if (isBookmarked === 0){
            setIsBookmarkedCall(apiUrl, poem.id, 1);
            setIsBookmarked(1);
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
                    <Card.Title className="poem-title mb-2">{poem.Title}</Card.Title>
                    <img className="card-bookmark-icon" ref={bookmarkRef} onClick={onBookmarkClick}></img>
                    </div>
                    <Card.Subtitle className="poem-author mb-3">{"By " + poem.Poet}</Card.Subtitle>
                    <Card.Text>{poem.Poem.substring(0, 50) + "..."}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PoemDetailsCard;