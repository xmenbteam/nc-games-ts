\c nc_games;

  SELECT reviews.*, COUNT(comments.review_id) :: INT AS comment_count
  FROM reviews 
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  WHERE reviews.review_id = 14
  GROUP BY reviews.review_id 
  LIMIT 1

      --  RUN FILE -> psql -f scratch.sql