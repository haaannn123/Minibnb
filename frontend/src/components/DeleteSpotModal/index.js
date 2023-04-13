import "./DeleteSpotModal.css"
import { useModal } from '../../context/Modal';

const DeleteSpotModal = () => {
    const {closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchEvent()
        .then(closeModal)
    }
    return (
        <form onSubmit={(handleSubmit)}>
            <h1>Confirm Delete</h1>
            <h1>Are you sure you want to remove this spot from the listings?</h1>
            <button>Yes</button>
            <button>No</button>
        </form>
    )
}

export default DeleteSpotModal;
