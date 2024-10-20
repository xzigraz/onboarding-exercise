import { Car } from "@/app/onboarding/[[...slug]]/page"
import { getInputChangeData, InputChangeEvent } from "@/utils/inputChangeEvent"
import { CarEntry } from "./car"

type CarsTableTypes = {
	name: string
	cars: Array<Car>
	onInputChange(e: InputChangeEvent): void
	onHandleRemove(index: number): void
}

export const CarsTabe = ({ name, cars, onInputChange, onHandleRemove }: CarsTableTypes) => {
	const getDispatchInputChangeEvent = (cars: Array<Partial<Car>>): InputChangeEvent => {
		return ({ target: { name, value: cars } });
	}
	const handleInputChange = (index: number, e: InputChangeEvent) => {
		const car = cars[index];
		const updatedCar = getInputChangeData(e);

		cars[index] = { ...car, ...updatedCar };

		onInputChange(getDispatchInputChangeEvent(cars))
	}

	return <>
		{cars?.map((car, index) =>
			<CarEntry
				key={`${car.id}-${index}`}
				car={car}
				index={index}
				onInputChange={e => handleInputChange(index, e)}
				onHandleRemove={onHandleRemove} />)
		}
	</>
}