import React from "react";
import { ReactComponent as GithubIcon } from "images/github.svg";

export const GithubLink = () => {
	return (
		<a
			href="https://github.com/dead0005/Bomb-Party"
			rel="noreferrer"
			target="_blank"
			className="absolute bottom-4 left-4 p-3 opacity-70 hover:opacity-100 transition-opacity z-50 tooltip tooltip-right"
			data-tip="Made by dead0005"
		>
			<GithubIcon className="w-6 h-6 fill-base-content" />
		</a>
	);
};
