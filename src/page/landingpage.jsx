import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { PutDataThunk } from "../feature/putdataSlice"
import { isDataInsertedTemp } from "../feature/putdataSlice"
import { clearIsDataInsertedState } from "../feature/putdataSlice"
import { getDataTemp } from "../feature/putdataSlice"
import { GetDataThunk } from "../feature/putdataSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { isDataDeletedTemp } from "../feature/putdataSlice";
import { clearIsDataDeletedState } from "../feature/putdataSlice";
import { DeleteDataThunk } from "../feature/putdataSlice";
import { EditDataThunk } from "../feature/putdataSlice";
import { clearIsDataEditedState } from "../feature/putdataSlice";
import { isDataEditedTemp } from "../feature/putdataSlice";
import { Zoom, Slide, Fade } from "react-awesome-reveal";
import { IoMdArrowDropup } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export const LandingPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [itemToEdit, seItemToEdit] = useState({
        editID: null,
        editText: '',
        editStatus: '',
    });

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        seItemToEdit({ ...itemToEdit, [name]: value });
    };

    const EditDataFunc = () => {
        dispatch(EditDataThunk({
            ID: itemToEdit.editID,
            text: itemToEdit.editText,
            status: itemToEdit.editStatus,
        }))
    }

    const isDataEdited = useSelector(isDataEditedTemp);

    useEffect(() => {
        if (isDataEdited == true) {
            dispatch(GetDataThunk('all'));
            dispatch(clearIsDataEditedState());
            setOpenModal(false);
        }
    })




    const dispatch = useDispatch();

    const [data, setData] = useState({
        text: '',
        status: 'not started',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const PutDataFunc = () => {

        dispatch(PutDataThunk({
            text: data.text,
            status: data.status,
        }));

    }
    const isDataInserted = useSelector(isDataInsertedTemp);

    useEffect(() => {
        if (isDataInserted == true) {
            setData({
                text: '',
                status: 'not started',
            })
            dispatch(clearIsDataInsertedState());
            dispatch(GetDataThunk('all'));
        }
    }, [isDataInserted])

    const getData = useSelector(getDataTemp);

    const DeleteItemFunc = (ID) => {
        dispatch(DeleteDataThunk(ID));
    }

    const isDataDeleted = useSelector(isDataDeletedTemp);

    useEffect(() => {
        if (isDataDeleted == true) {
            dispatch(GetDataThunk('all'));
            dispatch(clearIsDataDeletedState());
        }
    }, [isDataDeleted])

    // get the length of each status
    function getObjectLengthBasedOnValue(arr, key, value) {
        let count = 0;
        for (const obj of arr) {
            if (obj[key] === value) {
                count++;
            }
        }
        return count;
    }
    const notStartedLength = getObjectLengthBasedOnValue(getData, 'status', 'not started');
    const inProgessLength = getObjectLengthBasedOnValue(getData, 'status', 'in progress');
    const doneLength = getObjectLengthBasedOnValue(getData, 'status', 'done');


    const GetDataBasedOnStatusFunc = (status) => {
        dispatch(GetDataThunk(status));
    }

    const [showFilter, setShowFilter] = useState(false);
    const ShowFilterFunc = () => {
        setShowFilter(!showFilter);
    }

    let showFilterString = '';
    let iconRotate = '';
    if (showFilter) {
        showFilterString = 'h-[20rem]';
        iconRotate = 'rotate-180';
    }

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = getData.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="relative bg-gray-900 h-screen w-screen flex items-center justify-center">
            <div className="h-[90%] w-[45rem] max-w-[95%] flex flex-col justify-start gap-y-5">
               <p className="text-2xl text-gray-300">Todo List</p>
                <section className="bg-gray-800 z-10 h-[3.5rem] min-h-[3.5rem] w-full rounded-t-xl">
                    <div className="h-full w-full flex items-center justify-between ">
                        <div className="w-[5rem] h-full flex items-center justify-center">
                            <FiSearch className="text-gray-300 text-[1.8rem]" />
                        </div>

                        <input
                            type="text"
                            placeholder="Filter Todos..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="w-full h-full bg-gray-800 text-gray-300 text-xl outline-none "
                        />
                        <div onClick={ShowFilterFunc} className={`${iconRotate} w-[5rem] h-full duration-300 flex items-center justify-center`}>
                            <IoMdArrowDropup className={`text-gray-300  text-[2rem]`} />
                        </div>

                    </div>
                    <div onClick={ShowFilterFunc} className={`${showFilterString} h-0 bg-black bg-opacity-75 backdrop-blur-sm text-gray-300 text-2xl w-full flex flex-col justify-evenly  items-center rounded-b-xl overflow-hidden duration-300`}>
                        <div onClick={() => { GetDataBasedOnStatusFunc('all'); }} className=" cursor-pointer">
                            <p><span>( {getData.length} ) </span>All</p>
                        </div>
                        <hr className="h-[1px] w-full bg-gray-300 " />
                        <div onClick={() => { GetDataBasedOnStatusFunc('in progress'); }} className=" cursor-pointer">
                            <p><span>( {inProgessLength} ) </span>In Progress</p>
                        </div>
                        <hr className="h-[1px] w-full bg-gray-300 " />
                        <div onClick={() => { GetDataBasedOnStatusFunc('not started'); }} className="cursor-pointer">
                            <p><span>( {notStartedLength} ) </span>Not Started</p>
                        </div>
                        <hr className="h-[1px] w-full bg-gray-300 " />
                        <div onClick={() => { GetDataBasedOnStatusFunc('done'); }} className=" cursor-pointer">
                            <p><span>( {doneLength} ) </span>Done</p>
                        </div>
                    </div>
                </section>

                <section className="h-[4rem] min-h-[4rem] w-full flex flex-row">
                    <div className="w-[90%] ">
                        <input onChange={handleInputChange} value={data.text} name="text" type="text" placeholder="Enter your todo" className="h-full w-full px-8 bg-gray-800 text-gray-300 text-xl outline-none" />
                    </div>

                    <div className="h-full w-[10%] border-l border-gray-900 min-w-[4rem]">
                        <button onClick={PutDataFunc} className="h-full w-full bg-blue-600 hover:bg-blue-500 text-[2rem] font-bold text-gray-300 ">+</button>
                    </div>
                </section>

                <section className="h-fit rounded-b-xl overflow-scroll noScrollbar">

                    {
                        filteredData.length === 0 ?
                            (
                                <div className="h-[20rem] w-full border rounded-xl flex items-center justify-center">
                                    <p className="text-[4rem] font-extrabold text-gray-300 mob:text-[3rem]">No Todos</p>
                                </div>
                            )
                            :
                            (
                                filteredData.reverse().map((item) => (
                                    <div >
                                            <div key={item.ID} className="bg-gray-800 w-full min-h-[5rem] h-fit flex flex-row">
                                                <section className="w-[80%] flex items-center py-4 px-8 border border-gray-900 text-gray-300 text-xl text-wrap">
                                                    <div className="flex flex-col ">
                                                        <p className="text-sm text-gray-500">{item.status} / {item.date}</p>
                                                        {
                                                            item.status == 'done' ?
                                                                (
                                                                    <del className="text-red-500">{item.text}</del>
                                                                )
                                                                :
                                                                (
                                                                    <p>{item.text}</p>
                                                                )
                                                        }

                                                    </div>


                                                </section>
                                                <section className="border border-gray-900 w-[20%] flex flex-row items-center justify-evenly text-2xl text-gray-300 min-w-[5rem]">
                                                    <FaEdit onClick={() => {
                                                        setOpenModal(true); seItemToEdit({
                                                            editID: item.ID,
                                                            editText: item.text,
                                                            editStatus: item.status,
                                                        })
                                                    }} className="text-green-500 mob:text-xl" />
                                                    <RiDeleteBin6Line onClick={() => DeleteItemFunc(item.ID)} className="text-red-500 mob:text-xl" />
                                                </section>

                                            </div>

                                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                                <Modal.Header />
                                                <Modal.Body>
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Item</h3>
                                                        <textarea onChange={handleEditInputChange} value={itemToEdit.editText} className="w-full h-[8rem] border outline-none" name="editText" id=""></textarea>

                                                        <select onChange={handleEditInputChange} value={itemToEdit.editStatus} name="editStatus" className="h-[3rem] w-full outline-none border text-lg">
                                                            <option value="not started" >Not Started</option>
                                                            <option value="in progress" >In progress</option>
                                                            <option value="done" >Done</option>

                                                        </select>

                                                        <div className="w-full">
                                                            <Button onClick={EditDataFunc}>edit</Button>
                                                        </div>

                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                    </div>



                                ))
                            )
                    }

                </section>
            </div>
            <p className="absolute bottom-4 right-4 text-gray-300">created by: <span className="hover:text-blue-700"><a href="https://www.facebook.com/alupihang.dagat.142/">Realxnogga</a></span></p>
        </div>
    )
}