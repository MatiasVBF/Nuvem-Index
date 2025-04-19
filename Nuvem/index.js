const { DefaultAzureCredential } = require("@azure/identity");
const { SubscriptionClient } = require("@azure/arm-subscriptions");

async function listServicesByCategory(subscriptionId, category) {
    const credential = new DefaultAzureCredential();
    const client = new SubscriptionClient(credential);

    try {
        const result = await client.subscriptions.list();
        console.log("Lista de serviços na categoria:", category);

        result.forEach(service => {
            if (service.tags && service.tags.category === category) {
                console.log(`Nome: ${service.displayName}, ID: ${service.subscriptionId}`);
            }
        });
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
    }
}

// Substitua pelo seu ID de assinatura do Azure e a categoria desejada
const subscriptionId = "SEU_SUBSCRIPTION_ID";
const category = "compute"; // Exemplo de categoria

listServicesByCategory(subscriptionId, category);
