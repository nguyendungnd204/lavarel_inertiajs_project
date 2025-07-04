import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.store"));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center ">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Project</h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel
                                    htmlFor="project_image_path"
                                    value="Project Image"
                                    className="text-white"
                                />
                                <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="mt-1 block w-full text-white bg-gray-900"
                                    
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_name"
                                    value="Project Name"
                                    className="text-white"
                                />
                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full text-white bg-gray-900"
                                    isFocused={true}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                             <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_description"
                                    value="Project Description"
                                    className="text-white"
                                />
                                <TextAreaInput
                                    id="project_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full text-white bg-gray-900"
                                    isFocused={true}
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_due_date"
                                    value="Project Deadline"
                                    className="text-white"
                                />
                                <TextInput
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    onChange={e => setData('due_date', e.target.value)}
                                    className="mt-1 block w-full text-white bg-gray-900"
                                    isFocused={true}
                                />
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>

                             <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_status"
                                    value="Project Status"
                                    className="text-white"
                                />
                                <SelectInput
                                    id="project_status"
                                    name="status"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="mt-1 block w-full text-white bg-gray-900"
                                    isFocused={true}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("project.index")} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all  hover:bg-emerald-600">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    )
}