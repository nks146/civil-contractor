import {
    UserGroupIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

export default function AttendanceSummary({ summary }) {
    const cards = [
        {
            title: "Total Workers",
            value: summary?.totalWorkers ?? 0,
            icon: UserGroupIcon,
            iconBg: "bg-indigo-900",
            iconColor: "text-indigo-400",
        },
        {
            title: "Full Day",
            value: summary?.fullDay ?? 0,
            icon: CheckCircleIcon,
            iconBg: "bg-green-900",
            iconColor: "text-green-400",
        },
        {
            title: "Half Day",
            value: summary?.halfDay ?? 0,
            icon: ClockIcon,
            iconBg: "bg-yellow-900",
            iconColor: "text-yellow-400",
        },
        {
            title: "Absent",
            value: summary?.absent ?? 0,
            icon: XCircleIcon,
            iconBg: "bg-red-900",
            iconColor: "text-red-400",
        },
        {
            title: "Labour Cost",
            value: `₹${Number(summary?.labourCost ?? 0).toLocaleString("en-IN")}`,
            icon: CurrencyRupeeIcon,
            iconBg: "bg-blue-900",
            iconColor: "text-blue-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="
                            bg-gray-800
                            border border-gray-700
                            rounded-xl
                            p-5
                            shadow-lg
                            hover:border-gray-600
                            transition
                            duration-200
                        "
                    >
                        <div className="flex items-center justify-between">

                            {/* Text */}
                            <div>
                                <p className="text-sm text-gray-400">
                                    {card.title}
                                </p>
                                <p className="text-2xl font-bold text-white mt-2">
                                    {card.value}
                                </p>
                            </div>

                            {/* Icon */}
                            <div
                                className={`
                                    ${card.iconBg}
                                    rounded-lg
                                    p-3
                                `}
                            >
                                <Icon
                                    className={`
                                        h-6 w-6
                                        ${card.iconColor}
                                    `}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}