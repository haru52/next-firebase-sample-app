import '../app/stylesheets/alert.css';

export default function Alert() {
  return (
    <div
      id="alert"
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      This Web app is under construction!
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
