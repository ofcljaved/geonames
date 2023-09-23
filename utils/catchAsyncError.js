export default function catchAsyncError(func) {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}
