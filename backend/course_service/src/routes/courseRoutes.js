const express = require("express");

const router = express();

const {
  getCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  approveCourse,
  unApproveCourseList,
  getCoursesByInstructor,
  getAllAcceptedCourses,
  rejectCourse,
} = require("../controllers/courseController");
const { authentication } = require("../middleware/authMiddlware");
const { authAdminMiddleware } = require("../middleware/authAdminMiddleware");
const { authAdminAndStudent } = require("../middleware/authAdminAndStudent");

router
  .route("/")
  .get(authAdminMiddleware, getCourses)
  .post(authentication, createCourse);
router.get("/accept", getAllAcceptedCourses);
router.get("/:course_id", authAdminAndStudent, getCourse);
router.put("/:course_id/accept", authAdminMiddleware, approveCourse);
router.put("/:course_id/reject", authAdminMiddleware, rejectCourse);
router.delete("/:course_id", authentication, deleteCourse);
router.route("/instructor").get(authentication, getCoursesByInstructor);

module.exports = router;
