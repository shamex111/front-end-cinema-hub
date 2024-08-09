import { FC, useState } from 'react';

import Heading from '@/components/ui/heading/Heading';
import Modal from '@/components/ui/modal/Modal';

import { useProfile } from '@/hooks/useProfile';

import { IReview } from '@/types/review.types';

import LeaveReviewForm from './LeaveReviewForm';
import styles from './Reviews.module.scss';
import ReviewItem from './ReviewItem';
import { Icon } from '@/components/ui/Icon';

interface IReviews {
  reviews: IReview[];
  movieId: string;
}

const Reviews: FC<IReviews> = ({ reviews, movieId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useProfile();
  return (
    <div id="reviews" className="mt-8">
      <div className="mb-6">
        <Heading className='mb-3'>Отзывы</Heading>

        {user && (
          <div className='flex gap-2 items-center cursor-pointer w-fit' onClick={() =>setIsModalOpen(true)}>
            <Icon name='LuPencil' color='red'/>
          <button
            className="text-white/80 hover:text-white duration-200"
            
          >
            Оставить отзыв
          </button>
          </div>
        )}
      </div>
      {user && (
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} >
          <LeaveReviewForm movieId={movieId} setModalOpen={setIsModalOpen} />
        </Modal>
      )}
      <div className={styles.reviews}>
        {reviews.length ? (
          reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div>У данного фильма нет отзывов</div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
