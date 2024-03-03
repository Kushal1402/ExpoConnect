// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconClipboardList } from "@tabler/icons";

const other = {
    id: "sample-docs-roadmap",
    type: "group",
    children: [
        {
            id: "records",
            title: <FormattedMessage id="Records" />,
            type: "item",
            url: "/records",
            icon: IconClipboardList,
            breadcrumbs: false,
        },
    ],
}

export default other