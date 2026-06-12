// KIDS-ENGLISH-APP/functions/chat.js
export async function onRequestPost(context) {
    // 把你的 API Key 藏在后台，绝对安全
    const API_KEY = context.env.GLM_API_KEY;        
    // 接收前端（index.html）传过来的题目和录音文本
    const requestData = await context.request.json();
    try {
        // 由后台服务器去呼叫智谱大模型，完美绕过跨域限制
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        
        // 把大模型的回答原封不动地传回给前端
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: '大模型请求失败' }), { status: 500 });
    }
}