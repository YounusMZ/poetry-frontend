import React, { type JSX, useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router';
import "./PageNumberSelector.css";

interface Props {
	noOfResults: number | undefined,
	currentPage: number,
	searchString: string | undefined,
	updatePageNumber: (newPageNumber: number) => void
}

const PageNumberSelector: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();
	const currentPage = props.currentPage;
	const [pageButtons, setPageButtons] = useState<Array<JSX.Element>>();

	const onClickHandler = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPageNumber: number) => {
		if (props.searchString != ""){
			navigate("/results?poem=" + props.searchString + "&page=" + newPageNumber);
		} else navigate("/favourites?" + "page=" + newPageNumber);
		props.updatePageNumber(newPageNumber);
	}

	useEffect(() => {
		const adjacentPages: Array<JSX.Element> = [];
		if (props.noOfResults){
			let noOfPages = Math.ceil(props.noOfResults / 10);
			if (noOfPages > 1){
				for (let pageNumber = currentPage - 4; pageNumber < currentPage + 4; pageNumber++) {
					if (pageNumber >= 1 && pageNumber <= noOfPages){
						if (pageNumber === currentPage){
							adjacentPages.push(<Button className='selector-buttons-selected text-decoration-none' variant='link' key={"adjacentPagesButtons" + pageNumber} onClick={(event) => onClickHandler(event, pageNumber)}>{pageNumber}</Button>);
						} else {
							adjacentPages.push(<Button className='selector-buttons text-decoration-none' variant='link' key={"adjacentPagesButtons" + pageNumber} onClick={(event) => onClickHandler(event, pageNumber)}>{pageNumber}</Button>);
						}
					};
				};
			};
		}
		setPageButtons(adjacentPages);
	}, [currentPage, props.noOfResults]);
	
	return (
		<div className='selector-buttons-container'>
			{pageButtons}
		</div>
	);
};

export default PageNumberSelector;