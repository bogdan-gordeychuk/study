import { useState } from "react";
import {
  type AgentEvent,
  exampleCompletion,
  exampleRequest,
} from "./agent";

type ActionState = {
  title: string;
  details: string;
  status: "pending" | "submitting" | "approved" | "rejected" | "completed";
  error: string | null;
  result?: string;
};

export function App() {
  const [actions, setActions] = useState<Record<string, ActionState>>({});
  const [events, setEvents] = useState<AgentEvent[]>([]);

  function onEvent(event: AgentEvent): void {
    setEvents((previous) => [...previous, event]);

    // Шаг 1: обработай approval_requested.
    // Добавь карточку по actionId, если такого actionId ещё нет.
    // Используй setActions(previous => ...), чтобы не потерять другие карточки.
    // Шаг 2: после ревью добавим decide и action_completed.
    setActions((previous) => {
      // TODO: верни новое состояние для approval_requested.
      return previous;
    });
  }

  return (
    <main className="layout">
      <header>
        <span className="eyebrow">TypeScript · React · AI agents</span>
        <h1>Песочница: подтверждение действий агента</h1>
        <p>Нажимай кнопки слева, чтобы доставлять события. Пиши решение в src/App.tsx.</p>
      </header>

      <section className="columns">
        <div className="panel">
          <h2>Симулятор событий</h2>
          <div className="buttons">
            <button onClick={() => onEvent(exampleRequest)}>Запросить разрешение</button>
            <button onClick={() => onEvent(exampleRequest)}>Повторить запрос</button>
            <button onClick={() => onEvent(exampleCompletion)}>Сообщить о выполнении</button>
            <button onClick={() => onEvent({ type: "message", text: "Проверяю черновики" })}>
              Сообщение агента
            </button>
          </div>
          <h3>Получено событий: {events.length}</h3>
          <ol className="log">
            {events.map((event, index) => (
              <li key={index}>
                <code>{event.type}</code>
                {"actionId" in event && <span> · {event.actionId}</span>}
              </li>
            ))}
          </ol>
        </div>

        <div className="panel">
          <h2>Карточки действий</h2>
          {Object.entries(actions).length === 0 && (
            <p className="empty">Пока пусто. Реализуй обработку approval_requested.</p>
          )}
          {Object.entries(actions).map(([actionId, action]) => (
            <article className="action" key={actionId}>
              <small>{actionId}</small>
              <h3>{action.title}</h3>
              <p>{action.details}</p>
              <p>Состояние: <strong>{action.status}</strong></p>
              {action.error && <p role="alert">{action.error}</p>}
              {action.result && <p>Результат: {action.result}</p>}
              {/* Шаг 2: добавь сюда кнопки «Разрешить» и «Отклонить». */}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
