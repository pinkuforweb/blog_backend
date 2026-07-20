const blogModel = require("../models/blog");
const commentModel = require("../models/comments")
const jwt = require("jsonwebtoken")

const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Credentials 🥺" });
    }

    const token = jwt.sign({id:process.env.ADMIN_EMAIL},process.env.JWT_SECRET,{expiresIn:"2d"})

    res.status(200).json({ success: true, message: "Successfully Login 😍" , token:token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminCreateBlog = async (req, res) => {
  try {

    const BImage = req.file.filename

    const { blogTitle, blogSubTitle, blogCategory, blogDesc, blogAction } =
      req.body;
    if (
      !blogTitle ||
      !blogSubTitle ||
      !blogCategory ||
      !blogDesc ||
      !blogAction
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 🥺" });
    }

    const record = new blogModel({
      title: blogTitle,
      subTitle: blogSubTitle,
      description: blogDesc,
      category: blogCategory,
      publish: blogAction,
      blogImage:BImage
    });

    await record.save();
    res
      .status(200)
      .json({ success: true, message: "Blog insert successfully 😍" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

const adminAllBlogData = async (req, res) => {
  try {
    const data = await blogModel.find();
    res.status(200).json({ success: true, blogData: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

const adminBlogDelete = async (req, res) => {
  try {
    const id = req.params.abc;
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully Deleted 😍" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

adminBlogEditData = async (req, res) => {
  try {
    const id = req.params.abc;
    const data = await blogModel.findById(id);
    res.status(200).json({ success: true, editData: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

adminBlogUpdate = async(req, res) => {
  try {
    const id = req.params.abc;
    const {
      blogTitle,
      blogSubTitle,
      blogDesc,
      blogAction,
      blogCategory
    } = req.body;
    
    await blogModel.findByIdAndUpdate(id,{
       title:blogTitle,
    subTitle:blogSubTitle,
    description:blogDesc,
    category:blogCategory,
    publish:blogAction
    })

    res.status(200).json({success:true,message:"Successfully edit.😍"})
   
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};


const adminComments = async(req,res)=>{
  try {
    const data = await commentModel.find()
    res.status(200).json({commentData:data,success:true})
  } catch (error) {
     res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
}

const adminCommentDelete = async(req,res)=>{
  try {
    const id = req.params.abc
    await commentModel.findByIdAndDelete(id)
    res.status(200).json({success:true,message:"Successfully comment deleted.✅"})
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
}

const adminCommentApproved = async(req,res)=>{
  try {
    const id = req.params.abc
    await commentModel.findByIdAndUpdate(id,{
      isApproved:true
    })
    res.status(200).json({success:true,message:"Approved ✅"})
  } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
}

module.exports = {
  adminLogin,
  adminCreateBlog,
  adminAllBlogData,
  adminBlogDelete,
  adminBlogEditData,
  adminBlogUpdate,
  adminComments,
  adminCommentDelete,
  adminCommentApproved
};