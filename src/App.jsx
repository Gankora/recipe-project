import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex

	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	const handlePrevStep = () => {
		// Назад
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
			// console.log("Назад", activeIndex);
		}
	};

	const handleNextStep = () => {
		// Вперёд
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
			// console.log("Вперёд", activeIndex);
		}
	};

	const handleRestart = () => {
		//рестарт
		setActiveIndex(0);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	const isFirstStep = activeIndex === 0; // начало
	const isLastStep = activeIndex === steps.length - 1; // конец

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles["steps-list"]}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={`${styles["steps-item"]} ${
									index === activeIndex ? styles.active : ""
								} ${index <= activeIndex ? styles.done : ""}`}
							>
								<button
									className={styles["steps-item-button"]}
									onClick={() => {
										setActiveIndex(index);
									}}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							disabled={isFirstStep}
							onClick={handlePrevStep}
						>
							Назад
						</button>
						{!isLastStep && (
							<button
								className={styles.button}
								disabled={isLastStep}
								onClick={handleNextStep}
							>
								Далее
								{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
								{/* Или заменять всю кнопку в зависимости от условия */}
							</button>
						)}
						{isLastStep && (
							<button
								className={styles.button}
								disabled={!isLastStep}
								onClick={handleRestart}
							>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
