import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {



    const searchFieldChanged = (name, value) => {
        queryParams = { ...queryParams };
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        queryParams = { ...queryParams };
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('project.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    }
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center ">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
                    <Link href={route("project.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />
            {
                success && (
                    <div className="bg-emerald-500 py-2 px-4 text-white rounded text-center">
                        {success}
                    </div>

                )
            }

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput className="w-full" placeholder="Project Name"
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
                                            projects.data.map(project => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                                    <td className="px-3 py-3">{project.id}</td>
                                                    <td className="px-3 py-3"> <img src={project.image_path} style={{ width: 60 }} /></td>
                                                    <td className="px-3 py-3 text-gray-100 hover:underline text-nowrap">
                                                        <Link href={route("project.show", project.id)}>{project.name}</Link>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <span
                                                            className={
                                                                "px-2 py-1 rounded text-white " +
                                                                PROJECT_STATUS_CLASS_MAP[project.status]
                                                            }
                                                        >
                                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-3 text-nowrap">{project.created_at}</td>
                                                    <td className="px-3 py-3 text-nowrap">{project.due_date}</td>
                                                    <td className="px-3 py-3">{project.createdBy.name}</td>
                                                    <td className="px-3 py-3">
                                                        <Link href={route('project.edit', project.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>

                                                        <Link href={route('project.destroy', project.id)} className="text-red-500 hover:underline">Delete</Link>
                                                    </td>

                                                </tr>

                                            ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}