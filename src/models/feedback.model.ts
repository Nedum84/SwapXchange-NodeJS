import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import { FeedbackStatus } from "../enum/feedback.enum";
import CONSTANTS from "../utils/constants";

export interface FeedbackAttributes {
  id: number;
  feedback_id: string;
  user_id: string;
  message: string;
  status: FeedbackStatus;
  resolved_by: string;
}

interface FeedbackCreationAttributes
  extends Optional<
    FeedbackAttributes,
    "id" | "feedback_id" | "status" | "resolved_by"
  > {}

interface FeedbackInstance
  extends Model<FeedbackAttributes, FeedbackCreationAttributes>,
    FeedbackAttributes {}

const Feedback = sequelize.define<FeedbackInstance>(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    feedback_id: {
      type: DataTypes.STRING,
      defaultValue: CONSTANTS.UUID,
      primaryKey: true,
      comment: "Feedback Id",
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      values: Object.values(FeedbackStatus),
      defaultValue: FeedbackStatus.OPEN,
    },
    resolved_by: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "Feedback",
    version: true,
  }
);

export { Feedback };
