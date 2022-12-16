import React, { FC } from "react";

interface Props {
  title: string | number;
  subtitle: string;
  icon: JSX.Element;
}
export const SummaryTile: FC<Props> = ({ title, icon, subtitle }) => {
  return (
    <div className="flex py-6 rounded shadow">
      <div className="flex items-center justify-center w-48">{icon}</div>
      <div className="flex flex-col items-center justify-center w-48">
        <h3 className="text-xl">{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};
