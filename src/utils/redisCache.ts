import redis from "@config/redis.config";

export async function getRedis(key: string) {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error retrieving data from Redis:", error);
        return null;
    }
}

export async function setRedis(key: string, value: any, expiry: number) {
    try {
        await redis.set(key, JSON.stringify(value), { EX: expiry });
    } catch (error) {
        console.error("Error setting data in Redis:", error);
    }
}

export async function delRedis(key: string) {
    try {
        await redis.del(key);
    } catch (error) {
        console.error("Error deleting cache from Redis:", error);
    }
}
