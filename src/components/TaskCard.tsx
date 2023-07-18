import { cookies } from "next/headers";
import { TASK_STATUS } from "@prisma/client";
import { getUserFromCookie } from "~lib/auth";
import { db } from "~lib/db";
import Button from "./Button";
import Card from "./Card";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return {tasks};
};

const TaskCard = async ({ title, tasks }) => {
  const data = tasks || (await getData()).tasks;

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map(({id, name, description}) => (
              <div className="py-2" key={id}>
                <div>
                  <span className="text-gray-800">{name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;