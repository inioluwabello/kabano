import { IStatus } from "@/lib/interfaces";
import { archiveMultipleTasksByStatusAsync, deleteMultipleTasksByStatusAsync, useDispatch } from "@/lib/redux"

export const StatusActions = ({ boardId, status, onCloseDropdown }: { boardId: string, status: IStatus, onCloseDropdown: () => void }) => {
    
    const dispatch = useDispatch();
    const deleteTaskInStatus = async (status: string) => {
        const payload = {
            boardId: boardId,
            status: status,
        };

        onCloseDropdown()
        await dispatch(deleteMultipleTasksByStatusAsync(payload));
    }

    const archiveTaskInStatus = async (status: IStatus) => {
        const payload = {
            boardId: boardId,
            status: status,
        };

        onCloseDropdown()
        await dispatch(archiveMultipleTasksByStatusAsync(payload));
    }

    return (

        <div className="relative">
            <div className="status-options alt-text">
                <ul>
                    <li className="pointer" onClick={() => archiveTaskInStatus(status)}>
                        {/* <FontAwesomeIcon icon={faArchive} />  */}Archive
                    </li>
                    <li className="pointer" onClick={() => deleteTaskInStatus(status.status)}>
                        {/* <FontAwesomeIcon icon={faTrash} />  */}Delete
                    </li>
                </ul>
            </div>
        </div>
    )
}