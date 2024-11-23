import {Router} from 'express';
import {
    makeReview,
    getReviews
} from '../controllers/reviewController.js';

const reviewRouter = Router ();

reviewRouter.post('/makeReview', makeReview);
reviewRouter.get('/getReviews', getReviews);

export default reviewRouter;