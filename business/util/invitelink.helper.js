let unit = module.exports = {
    "generate": async (client) => {
        try {
            let link = await client.generateInvite(['ADMINISTRATOR']);
            console.log(link);
        } catch (e) {
            console.log(e.stack);
        }
    }
}