import { createCategory, getCategory } from "../../database/app/category.js";

const categoryController = async (req, res) => {
    try {
        const categoryCreateData = await createCategory(req.body);
        res.status(201).json({ message: 'Category created successfully', categoryCreateData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during update category:', error, success: false })
    }
}

const getCategoryContoller = async (req, res) => {
    try {
        const categoryGetData = await getCategory(req.query);
        res.status(201).json({ message: 'Get Category Data', categoryGetData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during get category', error: error.message, success: false })
    }
}

export { categoryController, getCategoryContoller };