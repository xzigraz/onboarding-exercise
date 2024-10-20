import _ from "lodash";
import { Car } from "@/app/onboarding/[[...slug]]/page"
import { TextInput } from "@/ui-component/TextInput/textInput"
import { InputChangeEvent } from "@/utils/inputChangeEvent"
import { useState } from "react"
import "./_car.scss";

type CarTypes = {
	car: Car
	index: number
	onInputChange(e: InputChangeEvent): void
	onHandleRemove(car: number): void
}

export const CarEntry = ({ car, index, onInputChange, onHandleRemove }: CarTypes) => {
	const [keyword, setKeyword] = useState<string>("");

	return <>
		{(_.isEmpty(car.year) && _.isEmpty(car.brand) && _.isEmpty(car.model)) && <TextInput
			label="Search for car"
			name="search"
			value={keyword}
			placeholder="Year, maker, model"
			onValueChange={(e) => setKeyword(e.target.value)} />}
		<div className="car-container fields-equally-divided">
			<TextInput
				label="Year"
				name="year"
				value={car?.year}
				onValueChange={(e) => onInputChange(e)} />
			<TextInput
				label="Maker"
				name="brand"
				value={car?.brand}
				onValueChange={(e) => onInputChange(e)} />
			<TextInput
				label="Model"
				name="model"
				value={car?.model}
				onValueChange={(e) => onInputChange(e)} />
			{index !== 0
				? <span className="material-symbols-outlined" onClick={() => onHandleRemove(index)}>delete</span>
				: <span />}
		</div>
	</>
}