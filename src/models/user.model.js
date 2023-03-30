import { Entity, Schema } from 'redis-om';
import { redisClient } from '../db/index.js';

class FoodRepository extends Entity {}

const foodSchema = new Schema(FoodRepository, {
    name: { type: 'text' },
    description: { type: 'text' },
    category: { type: 'string' },
    price: { type: 'number', sortable: true },
    userId: { type: 'string' },
    createdAt: { type: 'date', sortable: true },
    updatedAt: { type: 'date', sortable: true },
  }, {
    dataStructure: 'HASH'
  });
  
const FoodRepository = redisClient.fetchRepository(foodSchema);

await FoodRepository.createIndex();

export { FoodRepository };