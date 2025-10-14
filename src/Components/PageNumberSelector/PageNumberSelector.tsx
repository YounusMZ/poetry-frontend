import React, { type JSX, useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";

interface Props {
	noOfResults: number,
	currentPage: number,
	updatePageNumber: (newNumber: number) => void,
};

const PageNumberSelector: React.FC<Props> = (props: Props) => {
	const noOfPages: number = props.noOfResults / 10;
	const currentPage: number = props.currentPage;
	const [pageButtons, setPageButtons] = useState<Array<JSX.Element>>();

	useEffect(() => {
		const adjacentPages: Array<JSX.Element> = [];
		if (noOfPages >= 1){
			for (let number = currentPage - 5; number < currentPage + 5; number++) {
				if (number >= 0 && number <= noOfPages){
					adjacentPages.push(<Button variant='link' key={"adjacentPagesButtons" + number} onClick={() => props.updatePageNumber(number)}>{number}</Button>);
				};
			};
		};
		setPageButtons(adjacentPages);
	}, [currentPage, noOfPages]);
	
	return (
		<>
			{pageButtons}
		</>
	);
};

export default PageNumberSelector;