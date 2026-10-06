export type AgentEvent =
  | { type: "message"; text: string }
  | {
      type: "approval_requested";
      actionId: string;
      title: string;
      details: string;
    }
  | { type: "action_completed"; actionId: string; result: string }
  | { type: "finished" }
  | { type: "failed"; error: string };

export type Decision = "approve" | "reject";

// Это только имитация доставки решения. Действие здесь не выполняется.
// В следующем шаге можно добавить переключатель ошибки для проверки повтора.
export async function decide(actionId: string, decision: Decision): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 450));
  console.info("Решение отправлено", { actionId, decision });
}

export const exampleRequest: AgentEvent = {
  type: "approval_requested",
  actionId: "delete-drafts-12",
  title: "Удалить 12 черновиков отчётов",
  details: "Агент нашёл старые черновики и предлагает удалить их.",
};

export const exampleCompletion: AgentEvent = {
  type: "action_completed",
  actionId: "delete-drafts-12",
  result: "Удалено 12 черновиков",
};
