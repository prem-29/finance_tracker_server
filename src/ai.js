import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function fetchUserData(userId, db) {
    const expenses = await db.query(
        "SELECT amount, date, category_id, notes FROM expenses WHERE user_id = $1",
        [userId]
    );
    const income = await db.query(
        "SELECT amount, date, category_id, notes FROM income WHERE user_id = $1",
        [userId]
    );

    return {
        expenses: expenses.rows,
        income: income.rows,
    };
}

export async function askIndicAI(question, user_id, db) {
    const { expenses, income } = await fetchUserData(user_id, db);

    // Turn DB rows into readable summaries
    const expenseSummary = expenses.map(
        e => `${e.date}: ${e.amount} (${e.category_id}) ${e.notes || ""}`
    ).join("\n");
    const incomeSummary = income.map(
        i => `${i.date}: ${i.amount} (${i.category_id}) ${i.notes || ""}`
    ).join("\n");
    const systemPrompt = `
            You are an AI finance assistant.
            - Always answer using the user's actual financial data.
            - Give short, clear answers to factual questions.
            - If user asks for budgeting or financial advice, give personalized suggestions.
            --- USER EXPENSES ---
                ${expenseSummary}
            --- USER INCOME ---
                ${incomeSummary}
            `;
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini", // ✅ lightweight & cheap model
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
        ],
    });

    return response.choices[0].message.content;
}
