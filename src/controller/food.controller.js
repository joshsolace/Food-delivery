import { foodRepository } from '../repository/foodRepository.js';

const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      quantity,
      price,
    } = req.body;
    const food = await foodRepository.createAndSave({
      title: title.toLowerCase(),
      description,
      category: category.toLowerCase(),
      quantity,
      price,
      userId: req.validatedToken.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (food) {
      return res.status(201).send({
        error: false,
        message: 'Food successfully created',
        data: food,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: `Server error, please try again later. ${error}`,
    });
  }
};


const getAllFoods = async (req, res) => {
  try {
    // Fetch all foods sorting by the date created which ensures that the latest one come up first
    const allFoods = await foodRepository.search().sortDescending('createdAt');

    // Get the total number of foods in the DB
    const totalFoods = await foodRepository.search().return.count();

    return res.status(200).send({
      error: false,
      message: 'Foods retrieved successfully',
      data: {
        allFoods,
        totalFoods,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: `Server error, please try again later. ${error}`,
    });
  }
};

import { foodRepository } from '../repository/food.js';

const searchFoodByName = async (name) => {
  const foods = await foodRepository
    .search()
    .where('name')
    .contains(name.toLowerCase())
    .sortDescending('createdAt')
    .return.results();

  const totalFoods = foods.length;

  return {
    foods,
    totalFoods,
  };
};


const searchByCategory = async (category) => {
  const foods = await foodRepository
    .search()
    .where('category')
    .eq(category)
    .sortDescending('createdAt')
    .return.results();
  const totalFoods = await foodRepository
    .search()
    .where('category')
    .eq(category)
    .return.count();

  return {
    foods,
    totalFoods,
  };
};


