import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard(props) {
  //   const labels = ["January", "February", "March", "April", "May", "June"];
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       backgroundColor: "hsl(252, 82.9%, 67.8%)",
  //       borderColor: "hsl(252, 82.9%, 67.8%)",
  //       data: [0, 10, 5, 2, 20, 30, 45],
  //     },
  //   ],
  // };

  // const configLineChart = {
  //   type: "line",
  //   data,
  //   options: {},
  // };

  // var chartLine = new Chart(
  //   document.getElementById("chartLine"),
  //   configLineChart
  // );
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className="p-6 my-6 text-gray-100">
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-gray-500 border border-violet-400">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">200</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-gray-500 border border-violet-400">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
            <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">168</p>
				<p className="capitalize">Products</p>
			</div>
		</div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-gray-500 border border-violet-400">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">200</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-gray-500 border border-violet-400">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">200</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
	</div>
</section>
                    </div>
                </div>
            </div>
            {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="shadow-lg rounded-lg overflow-hidden">
            <div className="py-3 px-5 bg-gray-50">Line chart</div>
            <canvas className="p-10" id="chartLine"></canvas>
            </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
