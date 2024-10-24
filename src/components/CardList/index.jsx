/* eslint-disable react/prop-types */
import IconStar from "../../assets/images/icon-star.svg";
import IconPlus from "../../assets/images/icon-plus.svg";
import IconMinus from "../../assets/images/icon-minus.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const CardList = (props) => {
	const { title, list } = props;
	const [activeIndexes, setActiveIndexes] = useState([0]);
	const contentRefs = useRef([]);

	const handleAccordion = (index) => {
		if (index === 0) return;
		if (activeIndexes.includes(index)) {
			setActiveIndexes(activeIndexes.filter((i) => i !== index));
		} else {
			setActiveIndexes([...activeIndexes, index]);
		}
	};

	useEffect(() => {
		contentRefs.current.forEach((content, index) => {
			if (content) {
				content.style.maxHeight = activeIndexes.includes(index)
					? `${content.scrollHeight}px`
					: "0px";
			}
		});
	}, [activeIndexes]);

	return (
		<div className="card">
			<div className="card-title">
				<img src={IconStar} alt="Star icon" />
				<h1>{title}</h1>
			</div>
			<div className="card-content">
				<div className="accordion">
					{list.map((item, index) => {
						const isActive = activeIndexes.includes(index);
						return (
							<div
								key={index}
								className={`accordion-item ${isActive ? "active" : ""}`}
							>
								<div
									className="accordion-item__title"
									onClick={() => handleAccordion(index)}
								>
									<p>{item.title}</p>
									{isActive ? (
										<img
											src={IconMinus}
											className="accordion-action-icon"
											alt="Minus icon"
										/>
									) : (
										<img
											src={IconPlus}
											className="accordion-action-icon"
											alt="Plus icon"
										/>
									)}
								</div>
								<div
									ref={(el) => (contentRefs.current[index] = el)}
									className={`accordion-item__content${
										isActive ? " expanded" : ""
									}`}
								>
									<p>{item.content}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CardList;
