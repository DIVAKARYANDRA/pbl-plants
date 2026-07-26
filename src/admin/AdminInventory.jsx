import { useMemo, useState } from "react";
import { PageHeader } from "./components/AdminUI";
import { useSiteData } from "../context/SiteDataContext";
import { getStockStatus } from "../utils/stockUtils";

export default function AdminInventory() {

    const {
        products,
        updateProduct
    } = useSiteData();

    const [search, setSearch] = useState("");

    const [inventoryActions, setInventoryActions] = useState({});

    const filtered = useMemo(() => {

        return products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );


    }, [products, search]);

    const totalProducts = products.length;

const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stockQuantity || 0),
    0
);

const lowStock = products.filter(
    p => getStockStatus(p) === "Limited Stock"
).length;

const outOfStock = products.filter(
    p => getStockStatus(p) === "Out of Stock"
).length;

const inventoryValue = products.reduce(
    (sum, p) =>
        sum +
        Number(p.stockQuantity || 0) *
        Number(p.discountPrice || p.price || 0),
    0
);

    function updateStock(product) {

    const config =
        inventoryActions[product.id];

    if (!config) {

        alert("Enter quantity.");

        return;

    }

    const qty =
        Number(config.quantity || 0);

    if (qty <= 0) {

        alert("Enter quantity.");

        return;

    }

    const current =
        Number(product.stockQuantity || 0);

    let newQty = current;

    if (config.action === "receive") {

        newQty += qty;

    } else {

        if (qty > current) {

            alert(
                `Only ${current} items available.`
            );

            return;

        }

        newQty -= qty;

    }

    updateProduct(
        product.id,
        {
            stockQuantity: newQty
        }
    );

    setInventoryActions(prev => ({
        ...prev,
        [product.id]: {
            action: "receive",
            quantity: "",
            reason: "Supplier Delivery"
        }
    }));

}

    return (

        <div>

            <PageHeader
                title="Inventory Management"
                subtitle="Manage available stock."
            />

            <input
                className="border rounded-lg px-4 py-3 w-full mb-6"
                placeholder="Search product..."
                value={search}
                onChange={e =>
                    setSearch(e.target.value)
                }
            />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

    <div className="bg-white rounded-xl2 shadow-card p-4">
        <div className="text-sm text-gray-500">
            Products
        </div>
        <div className="text-2xl font-bold text-forest-800">
            {totalProducts}
        </div>
    </div>

    <div className="bg-white rounded-xl2 shadow-card p-4">
        <div className="text-sm text-gray-500">
            Total Stock
        </div>
        <div className="text-2xl font-bold text-forest-800">
            {totalStock}
        </div>
    </div>

    <div className="bg-white rounded-xl2 shadow-card p-4">
        <div className="text-sm text-gray-500">
            Low Stock
        </div>
        <div className="text-2xl font-bold text-yellow-600">
            {lowStock}
        </div>
    </div>

    <div className="bg-white rounded-xl2 shadow-card p-4">
        <div className="text-sm text-gray-500">
            Out of Stock
        </div>
        <div className="text-2xl font-bold text-red-600">
            {outOfStock}
        </div>
    </div>

    <div className="bg-white rounded-xl2 shadow-card p-4">
        <div className="text-sm text-gray-500">
            Inventory Value
        </div>
        <div className="text-xl font-bold text-green-700">
            ₹{inventoryValue.toLocaleString("en-IN")}
        </div>
    </div>

</div>

            <div className="overflow-auto bg-white rounded-xl2 shadow-card">

                <table className="min-w-full">

                    <thead className="bg-sage-100">

                        <tr>

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4">
                                Current Stock
                            </th>

                            <th className="p-4">
                                Status
                            </th>

                            <th className="p-4">
                                Stock Action
                            </th>

                            <th className="p-4">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map(product => {

                            const status =
                                getStockStatus(product);

                            return (

                                <tr
                                    key={product.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {product.name}

                                    </td>

                                    <td className="text-center">

                                        {product.stockQuantity}

                                    </td>

                                    <td className="text-center">

                                        {status}

                                    </td>

                                    <td className="text-center">

                                        <div className="flex flex-col gap-2 items-center">

<select
className="border rounded px-2 py-1"

value={
inventoryActions[product.id]?.action ||
"receive"
}

onChange={(e)=>

setInventoryActions(prev=>({

...prev,

[product.id]:{

...(prev[product.id]||{}),

action:e.target.value

}

}))

}
>

<option value="receive">

Receive

</option>

<option value="remove">

Remove

</option>

</select>

<input
type="number"
min="1"
placeholder="Qty"
className="border rounded px-2 py-1 w-20 text-center"

value={
inventoryActions[product.id]?.quantity || ""
}

onChange={(e)=>

setInventoryActions(prev=>({

...prev,

[product.id]:{

...(prev[product.id]||{}),

quantity:e.target.value

}

}))

}
/>

<select
className="border rounded px-2 py-1"

value={
inventoryActions[product.id]?.reason ||
"Supplier Delivery"
}

onChange={(e)=>

setInventoryActions(prev=>({

...prev,

[product.id]:{

...(prev[product.id]||{}),

reason:e.target.value

}

}))

}
>

<option>

Supplier Delivery

</option>

<option>

Damaged

</option>

<option>

Manual Correction

</option>

<option>

Returned Item

</option>

<option>

Other

</option>

</select>

</div>

                                    </td>

                                    <td className="text-center">

                                        <button
                                            className="btn-primary"
                                            onClick={() =>
                                                updateStock(product)
                                            }
                                        >

                                            {
                                                    inventoryActions[product.id]?.action === "remove"

                                                    ? "➖ Remove"

                                                    : "📦 Receive"

                                            }

                                        </button>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    );

}