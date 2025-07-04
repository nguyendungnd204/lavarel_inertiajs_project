import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({ tasks, queryParams, hideProjectColumn = false }) {

    console.log(tasks.data);

    const searchFieldChanged = (name, value) => {
        queryParams = {...queryParams };
        if(value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return ;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        queryParams = {...queryParams };
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('task.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    }
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >ID</TableHeading>
                            <th className="px-3 py-3">Image</th>
                            {
                                !hideProjectColumn && (
                                    <th className="px-3 py-3">Project Name</th>
                                )
                            }
                            
                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >Name</TableHeading>
                            <TableHeading
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >Status</TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >Created Date</TableHeading>
                            <TableHeading
                                name="due_date"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >Due Date</TableHeading>
                            <th className="px-3 py-3">Created By</th>
                            <th className="px-3 py-3 text-right">Actions</th>
                        </tr>
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            {
                                !hideProjectColumn && (
                                     <th className="px-3 py-3"></th>
                                )
                            }
                            <th className="px-3 py-3">
                                <TextInput className="w-full" placeholder="Task Name"
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    placeholder="Select Status"
                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                >
                                    <option value="" aria-readonly>Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            tasks.data.map(task => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                    <td className="px-3 py-3">{task.id}</td>
                                    <td className="px-3 py-3"> <img src={task.image_path} style={{ width: 60 }} /></td>
                                    {
                                        !hideProjectColumn && (
                                            <td className="px-3 py-3">{task.project.name}</td>
                                        )
                                    }
                                    
                                    <td className="px-3 py-3">{task.name}</td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                TASK_STATUS_CLASS_MAP[task.status]
                                            }
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-nowrap">{task.created_at}</td>
                                    <td className="px-3 py-3 text-nowrap">{task.due_date}</td>
                                    <td className="px-3 py-3">{task.createdBy.name}</td>
                                    <td className="px-3 py-3">
                                        <Link href={route('task.edit', task.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>

                                        <Link href={route('task.destroy', task.id)} className="text-red-500 hover:underline">Delete</Link>
                                    </td>

                                </tr>

                            ))}

                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links} />
        </>
    )
}