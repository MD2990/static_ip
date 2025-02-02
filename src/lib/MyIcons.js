import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import {
	FcBearish,
	FcSettings,
	FcOrgUnit,
	FcPodiumWithAudience,
	FcRatings,
	FcSupport,
	FcSurvey,
	FcTemplate,
	FcStackOfPhotos,
	FcServices,
	FcSimCardChip,
	FcRefresh,
	FcTreeStructure,
	FcVoicemail,
	FcWiFiLogo,
	FcWorkflow,
	FcSynchronize,
	FcTimeline,
	FcScatterPlot,
	FcPositiveDynamic,
	FcOrganization,
	FcOpenedFolder,
	FcMenu,
	FcList,
	FcKindle,
	FcInvite,
	FcInternal,
	FcGenealogy,
	FcElectricity,
	FcElectricalThreshold,
	FcElectronics,
	FcDocument,
	FcDeployment,
	FcDam,
} from "react-icons/fc";

function MyIcons() {
	let MyIcons = [
		FcBearish,
		FcSettings,
		FcOrgUnit,
		FcPodiumWithAudience,
		FcRatings,
		FcSupport,
		FcSurvey,
		FcTemplate,
		FcStackOfPhotos,
		FcServices,
		FcSimCardChip,
		FcRefresh,
		FcTreeStructure,
		FcVoicemail,
		FcWiFiLogo,
		FcWorkflow,
		FcSynchronize,
		FcTimeline,
		FcScatterPlot,
		FcPositiveDynamic,
		FcOrganization,
		FcOpenedFolder,
		FcMenu,
		FcList,
		FcKindle,
		FcInvite,
		FcInternal,
		FcGenealogy,
		FcElectricity,
		FcElectricalThreshold,
		FcElectronics,
		FcDocument,
		FcDeployment,
		FcDam,
	];

	return (
		<HStack
			wrap={"wrap"}
			justify={"center"}
			direction="row"
			fontSize={[30, 60, 90, 150]}
			position="absolute"
			zIndex={"-1"}
			opacity={"0.11"}
			w="95%"
			h="95%"
			spacing={[5, 10, 25, 55]}
			top={["12%", "6%", "-10%"]}
		>
			{MyIcons.map((Icon, index) => {
				return (
					<Flex align="flex-start" key={index} transform={`rotate(50deg)`}>
						{<Icon />}
					</Flex>
				);
			})}
		</HStack>
	);
}
export const MyMiniIcon = React.memo(MyIcons);
