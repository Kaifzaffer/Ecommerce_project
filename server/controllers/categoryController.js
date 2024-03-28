import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  const { name } = req.body;
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
        category: existingCategory,
      });
    }

    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    // await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating category. ",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category. ",
      error,
    });
  }
};

export const getCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error,
    });
  }
};


export const singleCategoriesController = async (req, res) => {
    try{
        const {slug} = req.params;
        const category = await Category.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category

        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try{
        const {id} = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"

        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}
