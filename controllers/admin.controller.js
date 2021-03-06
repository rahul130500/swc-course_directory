const Course = require("../models/course");
const Professor = require("../models/professor");

exports.getCourses = async (req, res) => {
  try {
    if (req.user.isProfessor) {
      const courses = await Course.find({ professorEmail: req.user.email });
    } else if (req.user.isAdmin) {
      const courses = await Course.find({ moderatorEmail: req.user.email });
    }
    console.log(courses);
    return res.render("admin/AllCourse/index", {
      user: req.user,
      courses_data: courses,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddCourse = async (req, res) => {
  try {
    return res.render("admin/AllCourse/add", { user: req.user });
  } catch (error) {
    console.log(error);
  }
};

exports.postAddCourse = async (req, res) => {
  try {
    course_id = req.body.course_id.toUpperCase();
    course_name = req.body.course_name.toUpperCase();
    credits = req.body.credits;
    description = req.body.course_desc;
    professorName = req.user.username;
    branch = req.body.branch;
    console.log(branch);
    level = req.body.level;
    semester = req.body.semester;
    professorEmail = req.user.email;
    moderatorEmail = req.body.moderator;

    const courses = await Course.find({ course_id: course_id });
    if (courses.length != 0) {
      // if admin try to use course id that is already given then it returns to the same page
      return res.redirect("/coursedirectory/admin/add");
    } else {
      const course = await new Course({
        course_id,
        course_name,
        credits,
        description,
        professorName,
        professorEmail,
        moderatorEmail,
        semester,
        branch,
        level,
      }).save();
      console.log(course);
      return res.redirect("/coursedirectory/admin");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getEditCourse = async (req, res) => {
  try {
    const courses = await Course.findOne({ course_id: req.params.courseid });
    console.log(courses);
    return res.render("admin/AllCourse/edit", {
      user: req.user,
      courses_data: courses,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editCourse = async (req, res) => {
  try {
    course_id = req.body.course_id.toUpperCase();
    course_name = req.body.course_name.toUpperCase();
    credits = req.body.credits;
    description = req.body.course_desc;
    professorName = req.user.username;
    branch = req.user.department;
    level = req.body.level;
    semester = req.body.semester;
    professorEmail = req.user.email;
    moderatorEmail = req.body.moderator;

    const data = {
      course_id,
      course_name,
      credits,
      description,
      professorName,
      professorEmail,
      moderatorEmail,
      semester,
      branch,
      level,
    };
    await Course.findOneAndUpdate({ course_id: req.params.courseid }, data, {
      new: true,
    });
    return res.redirect("/coursedirectory/admin");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndRemove({ course_id: req.params.courseid });
    return res.redirect("/coursedirectory/admin");
  } catch (error) {
    console.log(error);
  }
};

exports.getOneCourseDetails = async (req, res) => {
  try {
    const courses = await Course.findOne({ course_id: req.params.courseid });
    return res.render("admin/home/index", {
      user: req.user,
      courses_data: courses,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postProfessor = async (req, res) => {
  try {
    const name = req.user.username;
    const department = req.body.department;
    const post = req.body.post;
    const contact = req.body.contact;
    const area = req.body.area;
    const email = req.user.email;
    const imagepath = req.file ? req.file.filename : filepath;
    console.log(name, department, post, contact, email, imagepath, area);
    const professor = await new Professor({
      name,
      department,
      post,
      contact,
      email,
      imagepath,
      area,
    }).save();
    console.log(professor);
    return res.redirect("/coursedirectory/admin");
  } catch (error) {
    console.log(error);
  }
};

exports.getProfForm = async (req, res) => {
  try {
    console.log("new");
    return res.render("admin/Professor/add", { user: req.user });
  } catch (error) {
    console.log(error);
  }
};
