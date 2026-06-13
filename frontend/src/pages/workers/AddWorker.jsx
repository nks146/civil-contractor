import WorkerForm from "../../components/worker/WorkerForm";

export default function AddWorker() {

  return(

    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

      <h1 className="text-2xl text-white font-bold mb-6">
        Add Worker
      </h1>

      <WorkerForm/>

    </div>

  );

}