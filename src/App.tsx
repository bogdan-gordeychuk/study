import { useState } from "react";

export function App() {
  const [done, setDone] = useState(false);

  function toggleDone(): void {
    setDone(!done);
  }

  return (
    <main className="layout">
      <header>
        <span className="eyebrow">React · шаг 1</span>
        <h1>Одна задача и одно состояние</h1>
        <p>Отметь задачу готовой, затем верни её обратно.</p>
      </header>

      <section className="columns">
        <div className="panel">
          <h2>Проверить отчёт</h2>
          <p>Кнопка вызывает функцию toggleDone.</p>
          <button onClick={toggleDone}>
            {done ? "Вернуть в работу" : "Отметить готовой"}
          </button>
        </div>

        <div className="panel">
          <h2>Результат</h2>
          <p>
            Состояние: <strong>{done ? "Готово" : "В работе"}</strong>
          </p>
          <p className="empty">
            После первого нажатия должно стать «Готово», после второго — «В работе».
          </p>
        </div>
      </section>
    </main>
  );
}
