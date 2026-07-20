const blogModel = require("../models/blog");
const commentModel = require("../models/comments");

const userBlogData = async (req, res) => {
  try {
    const data = await blogModel.find({ publish: "Publish" });

    res.status(200).json({ success: true, blogData: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

const userBlogDetails = async (req, res) => {
  try {
    const id = req.params.abc;
    const data = await blogModel.findById(id);
    res.status(200).json({ success: true, blog: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

const userComment = async (req, res) => {
  try {
    const { name, comment , title } = req.body;
    const record = new commentModel({
      userName: name,
      userComment: comment,
      blog:title
    });
    await record.save();
    res.status(200).json({success:true,message:"Successfully send comment to admin.👤"})
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
};

const AllUserComments = async(req,res)=>{
  try {
    const data = await commentModel.find({isApproved:true})
    res.status(200).json({success:true,comments:data})
  } catch (error) {
     res
      .status(500)
      .json({ success: false, message: "Internal server error 🙄" });
  }
}

module.exports = {
  userBlogData,
  userBlogDetails,
  userComment,
  AllUserComments
};