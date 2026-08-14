"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface Addon {
  name: string;
  price: number;
}

interface Props {
  selected?: Addon[]; // បន្ថែម ? ដើម្បីការពារកຸឱ្យ error ប្រសិនបើមិនទាន់បញ្ជូន props មក
  setSelected: (value: Addon[]) => void;
}

export default function AddonSelector({ selected = [], setSelected }: Props) {
  const t = useTranslations("Addons");

  const addons: Addon[] = [
    {
      name: t("extraEgg", { default: "Extra Egg" }),
      price: 1,
    },
    {
      name: t("extraRice", { default: "Extra Rice" }),
      price: 1.5,
    },
    {
      name: t("coldDrink", { default: "Cold Drink" }),
      price: 1,
    },
    {
      name: t("extraSauce", { default: "Extra Sauce" }),
      price: 0.5,
    },
  ];

  function toggleAddon(addon: Addon) {
    const exists = selected.some((item) => item.name === addon.name);

    if (exists) {
      setSelected(selected.filter((item) => item.name !== addon.name));
    } else {
      setSelected([...selected, addon]);
    }
  }

  return (
    <section className="mt-8 space-y-4">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
        🍽️ {t("chooseAddons", { default: "Choose Add-ons" })}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const isSelected = selected.some((item) => item.name === addon.name);

          return (
            <button
              type="button"
              key={addon.name}
              onClick={() => toggleAddon(addon)}
              className={`group relative flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 active:scale-[0.98] ${
                isSelected
                  ? "border-orange-500 bg-orange-50/80 dark:bg-orange-950/20 shadow-md shadow-orange-500/5"
                  : "border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-orange-300 dark:hover:border-orange-800 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Custom Checkbox Pill */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-500 border-orange-500 text-white shadow-sm shadow-orange-500/30"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 group-hover:border-orange-400"
                  }`}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>

                {/* Addon Details */}
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    {addon.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t("addExtraFlavor", { default: "Add extra flavor" })}
                  </p>
                </div>
              </div>

              {/* Price Tag */}
              <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                +${addon.price.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}