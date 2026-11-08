// 1. Tính điểm trung bình bằng useMemo
const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );
  
  // 2. Hàm gửi đánh giá
  const submitReview = async () => {
    if (!user) return;
    if (rating === 0) return setFormError("Vui lòng chọn số sao");
    if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");
    
    setFormError(null);
    setSending(true);
    try {
      const created = await addReview({
        bookId,
        userId: user.id,
        userName: user.name,
        rating,
        comment: comment.trim(),
      });
      setReviews((prev) => [created, ...prev]);
      setRating(0);
      setComment("");
    } catch (e) {
      setFormError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };