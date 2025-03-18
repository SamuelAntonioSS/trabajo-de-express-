import exprees from "express";
import reviewsController from "../controllers/reviewsController.js";

const router = exprees.Router();

router
.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.insertReview);

router
 .route("/:id")
 .put(reviewsController.updateReview)
 .delete(reviewsController.deleteReview);

 export default router;